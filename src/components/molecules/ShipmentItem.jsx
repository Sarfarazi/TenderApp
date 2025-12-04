import BoxLayout from "../templates/BoxLayout";
import ShipmentDate from "../atoms/ShipmentItem/ShipmentDate";
import DestinationArrow from "../atoms/ShipmentItem/DestinationArrow";
import ShipmentDesc from "../atoms/ShipmentItem/ShipmentDesc";
import ShipmentTimer from "./ShipmentTimer";
import ShipmentDetail from "../atoms/ShipmentItem/ShipmentDetail";
import ShipmentPriceSection from "./ShipmentPriceSection";
import { useState } from "react";

// states:
// 0 => available
// 1 => done
// 2 => pending
// 3 => rejected

const ShipmentItem = ({ state, showToast, data: itemData }) => {
  const [isExpired, setIsExpired] = useState(false);

  return (
    <>
      <BoxLayout state={state}>
        <div className={"flex flex-col gap-5 items-center w-full "}>
          {state == 0 && itemData?.SaveDate && itemData?.TenderDuration && (
            <ShipmentTimer
              setIsExpired={setIsExpired}
              startTime={itemData?.SaveDate}
              duration={itemData?.TenderDuration}
            />
          )}

          <ShipmentDate content={itemData?.StartDate} />
          <DestinationArrow
            state={state}
            from={itemData?.Beginning}
            to={itemData?.Destination}
          />

          <div className="self-start flex flex-col gap-2 w-full border-b pb-5">
            {itemData?.WeightApprox && (
              <ShipmentDetail
                title={"وزن بار"}
                value={itemData?.WeightApprox}
                isWeight={true}
              />
            )}
            {itemData?.LoadTypeName && (
              <ShipmentDetail
                title={"نوع بار"}
                value={itemData?.LoadTypeName}
              />
            )}
          </div>

          {itemData?.Description && (
            <ShipmentDesc state={state} desc={itemData?.Description} />
          )}

          <ShipmentPriceSection
            isExpired={isExpired}
            state={state}
            itemData={itemData}
            showToast={showToast}
          />
        </div>
      </BoxLayout>
    </>
  );
};

export default ShipmentItem;
