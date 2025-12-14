import { useContext, useEffect, useState } from "react";
import ValidationErrorToast from "../atoms/ValidationErrorToast";
import ShipmentItem from "../molecules/ShipmentItem";
import AuthContext from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import ShipmentItemLoading from "../molecules/loading/ShipmentItemLoading";
import BaseUrl from "../../BaseUrl";

const AvailableShipments = () => {
  const [isToastVisible, setIsToastVisible] = useState({
    isVisible: false,
    error: null,
    success: null,
  });
  const { token, phone } = useContext(AuthContext);

  const { refetch, data, error, loading } = useFetch(
    `${BaseUrl}/api/Main/GetBarInfoTender/GetBarInfoTenderAsync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mobile: phone,
      }),
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const showToast = (isVisible, error, success) => {
    setIsToastVisible({ isVisible, error, success });
  };

  return (
    <section className="flex flex-col gap-5 my-8">
      {isToastVisible.isVisible && (
        <ValidationErrorToast
          error={isToastVisible.error}
          success={isToastVisible.success}
        />
      )}
      {loading && (
        <>
          <ShipmentItemLoading key={1} />
          <ShipmentItemLoading key={2} />
        </>
      )}

      {error && (
        <p className="text-center mt-5 px-2 font-bold text-Red">{error}</p>
      )}

      {!loading && !error && data && (
        <>
          {data?.map((item) => {
            return (
              <ShipmentItem
                key={item.Id}
                data={item}
                showToast={showToast}
                state={0}
              />
            );
          })}
        </>
      )}
    </section>
  );
};

export default AvailableShipments;
