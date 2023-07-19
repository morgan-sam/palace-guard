const Disposition = ({ className, disposition }) => {
  return (
    <h3 className={`${className}`}>
      <span className="">Disposition:&nbsp;</span>
      <span className="">{disposition}</span>
    </h3>
  );
};

export default Disposition;
