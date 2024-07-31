import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";

function ChannelSubExplorer({ children, data, type }) {
  return (
    <>
      {children}
      <div className="my-2">
        {data.map((el) => (
          <NavLink key={nanoid()} to={`/channel/${type}/${el.id}`}>
            <button className="w-10 h-10 mx-auto my-1 bg-gray-300 rounded-full"></button>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ChannelSubExplorer;
