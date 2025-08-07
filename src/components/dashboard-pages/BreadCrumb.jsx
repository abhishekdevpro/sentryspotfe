const BreadCrumb = ({ title = "" }) => {
  return (
    <div className="upper-title-box p-2">
      <h3>{title}</h3>
      <div className="app-text-p">Ready to jump back in?</div>
    </div>
  );
};

export default BreadCrumb;
