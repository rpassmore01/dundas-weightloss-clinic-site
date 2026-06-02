export default function NoticeBar() {
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-base text-amber-900">
      <span className="font-semibold">Notice:</span> Dundas Weight Loss Clinic is no longer accepting new patients as of April 1st, 2026. New consults are being directed to{" "}
      <a
        href="https://www.wavemetabolic.ca/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-sky-700 hover:text-sky-900"
      >
        Wave Metabolics
      </a>
      .
    </div>
  );
}
