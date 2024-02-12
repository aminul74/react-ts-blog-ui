import React from "react";
import { BeatLoader } from "react-spinners";

interface LoadingSpinnerProps {
  isLoading: boolean;
  hasData?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  hasData,
}) => {
  if (isLoading || !hasData) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <BeatLoader color="#312E81" loading={isLoading} />
      </div>
    );
  }
};

export default LoadingSpinner;
