/**
 * The formative-use limit every case-facing assessment carries, rendered once
 * per report. Port of app/src/components/grading/formative-use-notice.tsx; the
 * wording mirrors "Educational Use Only" in the platform Terms of Service, so
 * change both together.
 */
export function FormativeUseNotice({ className }: { className?: string }) {
  return (
    <p
      className={`border-t border-cs-gray pt-4 text-[13px] leading-relaxed text-muted-foreground ${className ?? ""}`}
    >
      <span className="font-bold text-cs-dark-blue">Formative use only.</span>{" "}
      This feedback is AI-generated for education and professional development. It
      is not a clinical judgment or a credentialing determination, and must not be
      used as the sole basis for any promotion, remediation, credentialing, or
      other consequential decision. Responsibility for evaluation and personnel
      decisions stays with the program and its faculty.
    </p>
  );
}
