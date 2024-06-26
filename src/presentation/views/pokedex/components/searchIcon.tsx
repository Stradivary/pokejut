export const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="var(--mantine-color-text, #ffffff)"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-search"
    {...props}
  >
    <circle cx={11} cy={11} r={8} />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
