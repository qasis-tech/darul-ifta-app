const CountTile = ({ Icon, titile, value, style }) => (
  <div class="col-lg-2 col-sm-6">
    <div class="circle-tile">
      <a href="#">
        <div class={`circle-tile-heading ${style}`}>
          <Icon />
        </div>
      </a>
      <div class={`circle-tile-content ${style}`}>
        <div class="circle-tile-description text-faded">{titile}</div>
        <div class="circle-tile-number text-faded">
          {value}
          <span id="sparklineA"></span>
        </div>
      </div>
    </div>
  </div>
);

export default CountTile;
