#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, String, Symbol, Vec};

const FEE_DENOMINATOR: i128 = 10_000;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum CampaignStatus {
    Open,
    Active,
    Completed,
    Disputed,
    Cancelled,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ApplicationStatus {
    Applied,
    Selected,
    Rejected,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum SubmissionStatus {
    None,
    Submitted,
    Approved,
    Paid,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Campaign {
    pub id: u64,
    pub business: Address,
    pub asset: Address,
    pub budget: i128,
    pub payout_per_creator: i128,
    pub max_creators: u32,
    pub selected_count: u32,
    pub application_deadline: u64,
    pub content_deadline: u64,
    pub metadata: String,
    pub status: CampaignStatus,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Application {
    pub campaign_id: u64,
    pub creator: Address,
    pub profile: String,
    pub status: ApplicationStatus,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Submission {
    pub campaign_id: u64,
    pub creator: Address,
    pub proof_uri: String,
    pub status: SubmissionStatus,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    FeeBps,
    Treasury,
    NextCampaignId,
    Campaign(u64),
    Application(u64, Address),
    Submission(u64, Address),
    SelectedCreators(u64),
}

#[contract]
pub struct AdsBazaarEscrow;

#[contractimpl]
impl AdsBazaarEscrow {
    pub fn initialize(env: Env, admin: Address, treasury: Address, fee_bps: u32) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }

        if fee_bps > 1_000 {
            panic!("fee too high");
        }

        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Treasury, &treasury);
        env.storage().instance().set(&DataKey::FeeBps, &fee_bps);
        env.storage()
            .instance()
            .set(&DataKey::NextCampaignId, &1_u64);
    }

    pub fn create_campaign(
        env: Env,
        business: Address,
        asset: Address,
        budget: i128,
        payout_per_creator: i128,
        max_creators: u32,
        application_deadline: u64,
        content_deadline: u64,
        metadata: String,
    ) -> u64 {
        business.require_auth();

        if budget <= 0 || payout_per_creator <= 0 {
            panic!("invalid amount");
        }
        if max_creators == 0 {
            panic!("invalid creator count");
        }
        if payout_per_creator * max_creators as i128 > budget {
            panic!("budget below obligations");
        }
        if application_deadline >= content_deadline {
            panic!("invalid deadline order");
        }

        let contract = env.current_contract_address();
        token::Client::new(&env, &asset).transfer(&business, &contract, &budget);

        let id: u64 = env
            .storage()
            .instance()
            .get(&DataKey::NextCampaignId)
            .unwrap_or(1);

        let campaign = Campaign {
            id,
            business,
            asset,
            budget,
            payout_per_creator,
            max_creators,
            selected_count: 0,
            application_deadline,
            content_deadline,
            metadata,
            status: CampaignStatus::Open,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Campaign(id), &campaign);
        env.storage()
            .instance()
            .set(&DataKey::NextCampaignId, &(id + 1));
        env.storage()
            .persistent()
            .set(&DataKey::SelectedCreators(id), &Vec::<Address>::new(&env));
        env.events()
            .publish((Symbol::new(&env, "campaign_created"),), id);

        id
    }

    pub fn apply(env: Env, campaign_id: u64, creator: Address, profile: String) {
        creator.require_auth();

        let campaign = Self::campaign(env.clone(), campaign_id);
        if campaign.status != CampaignStatus::Open {
            panic!("campaign closed");
        }
        if env.ledger().timestamp() > campaign.application_deadline {
            panic!("application deadline passed");
        }

        let application = Application {
            campaign_id,
            creator: creator.clone(),
            profile,
            status: ApplicationStatus::Applied,
        };

        env.storage().persistent().set(
            &DataKey::Application(campaign_id, creator.clone()),
            &application,
        );
        env.events()
            .publish((Symbol::new(&env, "creator_applied"), campaign_id), creator);
    }

    pub fn select_creator(env: Env, campaign_id: u64, business: Address, creator: Address) {
        business.require_auth();

        let mut campaign = Self::campaign(env.clone(), campaign_id);
        if campaign.business != business {
            panic!("not campaign owner");
        }
        if campaign.status != CampaignStatus::Open && campaign.status != CampaignStatus::Active {
            panic!("campaign not selectable");
        }
        if campaign.selected_count >= campaign.max_creators {
            panic!("selection limit reached");
        }

        let mut application: Application = env
            .storage()
            .persistent()
            .get(&DataKey::Application(campaign_id, creator.clone()))
            .expect("application not found");

        application.status = ApplicationStatus::Selected;
        campaign.status = CampaignStatus::Active;
        campaign.selected_count += 1;

        let mut selected: Vec<Address> = env
            .storage()
            .persistent()
            .get(&DataKey::SelectedCreators(campaign_id))
            .unwrap_or(Vec::new(&env));
        selected.push_back(creator.clone());

        env.storage().persistent().set(
            &DataKey::Application(campaign_id, creator.clone()),
            &application,
        );
        env.storage()
            .persistent()
            .set(&DataKey::Campaign(campaign_id), &campaign);
        env.storage()
            .persistent()
            .set(&DataKey::SelectedCreators(campaign_id), &selected);
        env.events().publish(
            (Symbol::new(&env, "creator_selected"), campaign_id),
            creator,
        );
    }

    pub fn submit_proof(env: Env, campaign_id: u64, creator: Address, proof_uri: String) {
        creator.require_auth();

        let campaign = Self::campaign(env.clone(), campaign_id);
        if campaign.status != CampaignStatus::Active {
            panic!("campaign not active");
        }
        if env.ledger().timestamp() > campaign.content_deadline {
            panic!("content deadline passed");
        }

        let application: Application = env
            .storage()
            .persistent()
            .get(&DataKey::Application(campaign_id, creator.clone()))
            .expect("application not found");
        if application.status != ApplicationStatus::Selected {
            panic!("creator not selected");
        }

        let submission = Submission {
            campaign_id,
            creator: creator.clone(),
            proof_uri,
            status: SubmissionStatus::Submitted,
        };

        env.storage().persistent().set(
            &DataKey::Submission(campaign_id, creator.clone()),
            &submission,
        );
        env.events()
            .publish((Symbol::new(&env, "proof_submitted"), campaign_id), creator);
    }

    pub fn approve_submission(env: Env, campaign_id: u64, business: Address, creator: Address) {
        business.require_auth();

        let campaign = Self::campaign(env.clone(), campaign_id);
        if campaign.business != business {
            panic!("not campaign owner");
        }

        let mut submission: Submission = env
            .storage()
            .persistent()
            .get(&DataKey::Submission(campaign_id, creator.clone()))
            .expect("submission not found");
        if submission.status != SubmissionStatus::Submitted {
            panic!("submission not payable");
        }

        submission.status = SubmissionStatus::Approved;
        env.storage().persistent().set(
            &DataKey::Submission(campaign_id, creator.clone()),
            &submission,
        );
        env.events().publish(
            (Symbol::new(&env, "submission_approved"), campaign_id),
            creator,
        );
    }

    pub fn claim_payment(env: Env, campaign_id: u64, creator: Address) {
        creator.require_auth();

        let campaign = Self::campaign(env.clone(), campaign_id);
        let mut submission: Submission = env
            .storage()
            .persistent()
            .get(&DataKey::Submission(campaign_id, creator.clone()))
            .expect("submission not found");

        let auto_approved = submission.status == SubmissionStatus::Submitted
            && env.ledger().timestamp() > campaign.content_deadline;
        if submission.status != SubmissionStatus::Approved && !auto_approved {
            panic!("payment not approved");
        }

        let fee_bps: u32 = env.storage().instance().get(&DataKey::FeeBps).unwrap_or(50);
        let treasury: Address = env
            .storage()
            .instance()
            .get(&DataKey::Treasury)
            .expect("treasury not configured");
        let gross = campaign.payout_per_creator;
        let fee = gross * fee_bps as i128 / FEE_DENOMINATOR;
        let net = gross - fee;
        let contract = env.current_contract_address();
        let token = token::Client::new(&env, &campaign.asset);

        submission.status = SubmissionStatus::Paid;
        env.storage().persistent().set(
            &DataKey::Submission(campaign_id, creator.clone()),
            &submission,
        );

        token.transfer(&contract, &creator, &net);
        if fee > 0 {
            token.transfer(&contract, &treasury, &fee);
        }

        env.events()
            .publish((Symbol::new(&env, "payment_claimed"), campaign_id), creator);
    }

    pub fn flag_dispute(env: Env, campaign_id: u64, caller: Address) {
        caller.require_auth();

        let mut campaign = Self::campaign(env.clone(), campaign_id);
        if campaign.business != caller {
            let application: Option<Application> = env
                .storage()
                .persistent()
                .get(&DataKey::Application(campaign_id, caller.clone()));
            if application.is_none() {
                panic!("not a campaign participant");
            }
        }

        campaign.status = CampaignStatus::Disputed;
        env.storage()
            .persistent()
            .set(&DataKey::Campaign(campaign_id), &campaign);
        env.events()
            .publish((Symbol::new(&env, "campaign_disputed"),), campaign_id);
    }

    pub fn campaign(env: Env, campaign_id: u64) -> Campaign {
        env.storage()
            .persistent()
            .get(&DataKey::Campaign(campaign_id))
            .expect("campaign not found")
    }

    pub fn application(env: Env, campaign_id: u64, creator: Address) -> Option<Application> {
        env.storage()
            .persistent()
            .get(&DataKey::Application(campaign_id, creator))
    }

    pub fn submission(env: Env, campaign_id: u64, creator: Address) -> Option<Submission> {
        env.storage()
            .persistent()
            .get(&DataKey::Submission(campaign_id, creator))
    }

    pub fn selected_creators(env: Env, campaign_id: u64) -> Vec<Address> {
        env.storage()
            .persistent()
            .get(&DataKey::SelectedCreators(campaign_id))
            .unwrap_or(Vec::new(&env))
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, vec};

    #[test]
    fn creates_campaign_and_records_application() {
        let env = Env::default();
        env.mock_all_auths();

        let contract_id = env.register_contract(None, AdsBazaarEscrow);
        let client = AdsBazaarEscrowClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let treasury = Address::generate(&env);
        let business = Address::generate(&env);
        let creator = Address::generate(&env);

        let token_admin = Address::generate(&env);
        let asset = env.register_stellar_asset_contract(token_admin);
        let token = token::StellarAssetClient::new(&env, &asset);
        token.mint(&business, &1_000_000);

        client.initialize(&admin, &treasury, &50);

        let campaign_id = client.create_campaign(
            &business,
            &asset,
            &100_000,
            &10_000,
            &5,
            &1_000,
            &2_000,
            &String::from_str(&env, "ipfs://campaign-brief"),
        );

        client.apply(
            &campaign_id,
            &creator,
            &String::from_str(&env, "farcaster:victor"),
        );

        let application = client.application(&campaign_id, &creator).unwrap();
        assert_eq!(application.status, ApplicationStatus::Applied);
        assert_eq!(client.selected_creators(&campaign_id), vec![&env]);
    }
}
