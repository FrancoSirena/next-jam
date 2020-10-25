/**
 * Helper Pill styled element
 * @returns {ReactElement} Pill
 */
export function Pill({ children, as: Tag = 'span', className, ...rest }) {
  return <Tag className={`pill ${className}`} {...rest}>
    {children}
  </Tag>
}
