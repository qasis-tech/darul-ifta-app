const CountTile = ({ Icon, titile, value, custStyle }) => (
  <div className="col-lg-2 col-sm-6 main-tile">
    <div className="circle-tile">
      <a>
        <div className={`circle-tile-heading ${custStyle}`}>
          <Icon />
        </div>
      </a>
      <div className={`circle-tile-content ${custStyle}`}>
        <div className="circle-tile-description text-faded">{titile}</div>
        <div className="circle-tile-number text-faded">
          {value}
          <span id="sparklineA"></span>
        </div>
      </div>
    </div>
  </div>
);

export default CountTile;
