import "css-skeletons";

function Skeleton() {
  return (
    <>
      <div
        class="skeleton skeleton-rect mx-auto"
        style="--rect-h: 150px; --c-w: 100%; --lines: 20;"
      ></div>
    </>
  );
}

export default Skeleton;
