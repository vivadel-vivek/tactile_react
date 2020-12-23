import React, { useContext } from "react";

const Navbar = ({ theme }) => {
  return (
    <nav
      className="flex mw10"
      style={theme && { backgroundColor: theme.primary }}
    >
      <div class="outline w-10-ns pa3 mr2">
        <code>Logo</code>
      </div>
      <div class="outline w-25 pa3 mr2">
        <code>2</code>
      </div>
      <div class="outline w-5 pa3 mr2">
        <code>3</code>
      </div>
      <div class="outline w-5 pa3 mr2">
        <code>4</code>
      </div>
      <div class="outline w-2 pa3">
        <code>5</code>
      </div>
    </nav>
  );
};

export default Navbar;
