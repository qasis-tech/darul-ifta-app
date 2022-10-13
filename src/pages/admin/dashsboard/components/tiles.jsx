const CountTile = ({ Icon, titile, value, style }) => (
  <div className="col-lg-2 col-sm-6 main-tile">
    <div className="circle-tile">
      <a href="#">
        <div className={`circle-tile-heading ${style}`}>
          <Icon />
        </div>
      </a>
      <div className={`circle-tile-content ${style}`}>
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
