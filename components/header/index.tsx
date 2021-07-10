import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className='app-header'>
      <div className='flex justify-center items-center h-16'>
        <div className='text-3xl text-green-500 font-mono font-bold filter drop-shadow-md leading-loose'>RATE`LY</div>
      </div>
    </header>
  );
};

export default Header;
