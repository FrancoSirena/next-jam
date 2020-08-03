function Pill({ children, as: Tag = 'span', className, ...rest }) {
  return <Tag className={`pill ${className}`} {...rest}>
    {children}
  </Tag>
}

export default Pill;