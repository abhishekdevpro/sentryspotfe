const Wrapper = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
