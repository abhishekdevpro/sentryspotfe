import React from 'react';

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  description = "Are you sure you want to perform this action?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all w-full max-w-md">
          {/* Header */}
          <div className="px-6 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 mt-4 flex flex-row-reverse gap-3 bg-gray-50">
            <button
              onClick={onConfirm}
              className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 ${
                variant === 'destructive'
                  ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500'
              }`}
            >
              {confirmLabel}
            </button>
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;