const InfoBox = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <h6 className="text-sm font-medium text-gray-500">Invoice date:</h6>
          <span className="text-base text-gray-900">03/10/2021</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">Supplier</h4>
          <h5 className="text-base font-medium text-gray-700">sentryspot LLC</h5>
          <p className="text-sm text-gray-600">2301 Ravenswood Rd Madison, WI 53711</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <h6 className="text-sm font-medium text-gray-500">Due date:</h6>
          <span className="text-base text-gray-900">03/10/2021</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">Customer</h4>
          <h5 className="text-base font-medium text-gray-700">John Doe</h5>
          <p className="text-sm text-gray-600">329 Queensberry Street, North Melbourne VIC 3051, Australia.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
