import { DotSpinner } from '@uiball/loaders'
import "./loader.css";

function Loader() {
  return (
    <div className="loader_container">
      <DotSpinner size={50} speed={0.9} color="grey" />
    </div>
  );
}

export default Loader;
