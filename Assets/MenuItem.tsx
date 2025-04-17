import * as React from "react"

interface MenuItemProps {
    className?: string;
    onClick?:()=>void
}

const MenuItem: React.FC<MenuItemProps> = ({ className,onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    className={className}
    onClick={onClick}
  >
    <path
      fill="currentColor"
      d="M17.813 10.5a.938.938 0 0 1-.938.938H3.125a.938.938 0 0 1 0-1.876h13.75a.937.937 0 0 1 .938.938ZM3.124 6.437h13.75a.937.937 0 0 0 0-1.875H3.125a.937.937 0 1 0 0 1.875Zm13.75 8.125H3.125a.938.938 0 0 0 0 1.876h13.75a.938.938 0 0 0 0-1.875Z"
    />
  </svg>
)

export default MenuItem
