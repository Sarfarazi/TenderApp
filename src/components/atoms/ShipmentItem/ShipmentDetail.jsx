const ShipmentDetail = ({ title, value , isWeight }) => {
  return (
    <div className="flex items-center gap-1">
      <p>{title}:</p>
      <p className="text-lg">{value}</p>
      {isWeight && <p>کیلوگرم</p>}
    </div>
  );
};

export default ShipmentDetail;
