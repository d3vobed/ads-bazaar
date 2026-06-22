import { FileText, Flag, Play } from "lucide-react";
import type { CampaignDetail } from "./campaign-detail-data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ApplicantReviewTab({ campaign }: { campaign: CampaignDetail }) {
  return (
    <div>
      <div className="border border-[var(--dash-border)] bg-[var(--dash-surface)]">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--dash-heading)]">Pending Applicants</h2>
          <button
            type="button"
            disabled
            title="Coming soon"
            className="text-xs font-bold text-[var(--dash-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            View All &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-left">
            <thead className="border-y border-[var(--dash-border)]">
              <tr>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Creator
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Reach
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Bid
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--dash-muted)]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {campaign.applicants.map((applicant) => (
                <tr key={applicant.id} className="transition-colors hover:bg-[var(--dash-bg)]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--dash-border)] text-xs font-semibold text-[var(--dash-heading)]">
                        {initials(applicant.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--dash-heading)]">{applicant.name}</p>
                        <p className="text-xs text-[var(--dash-muted)]">{applicant.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--dash-body)]">{applicant.reach}</td>
                  <td className="px-4 py-4 text-sm font-bold text-[var(--dash-accent)]">{applicant.bid}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled
                        title="Coming soon"
                        className="border border-[var(--dash-border)] px-3 py-1.5 text-xs font-bold text-[var(--dash-muted)] transition-colors hover:border-red-400 hover:text-red-400 disabled:cursor-not-allowed"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        disabled
                        title="Coming soon"
                        className="bg-[var(--dash-accent-strong)] px-3 py-1.5 text-xs font-bold text-[var(--dash-on-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="mt-8 mb-4 text-sm font-semibold text-[var(--dash-heading)]">
        Proof Submission Queue
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {campaign.proofQueue.map((proof) => (
          <div key={proof.id} className="border border-[var(--dash-border)] bg-[var(--dash-bg)]">
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold text-[var(--dash-heading)]">{proof.creatorName}</span>
              <span className="rounded border border-[var(--dash-border)] px-2 py-0.5 text-[10px] font-bold tracking-widest text-[var(--dash-muted)]">
                PENDING REVIEW
              </span>
            </div>

            <div className="mx-4 flex aspect-video items-center justify-center bg-[var(--dash-border)]">
              {proof.mediaType === "video" ? (
                <Play className="size-8 text-[var(--dash-muted)]" aria-hidden="true" />
              ) : (
                <FileText className="size-8 text-[var(--dash-muted)]" aria-hidden="true" />
              )}
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="text-xs text-[var(--dash-muted)]">Submitted {proof.submittedAgo}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  aria-label="Flag submission"
                  className="flex size-8 items-center justify-center border border-[var(--dash-border)] text-[var(--dash-muted)] hover:border-red-400 hover:text-red-400 disabled:cursor-not-allowed"
                >
                  <Flag className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="bg-[var(--dash-accent-strong)] px-3 py-1.5 text-xs font-bold text-[var(--dash-on-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Release Payout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}