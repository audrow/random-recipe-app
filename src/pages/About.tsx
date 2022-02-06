import * as React from 'react'
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout isHideAboutButton={true}>
      <div>
        <h1 className="text-navy text-xl text-center p-3">About</h1>
        <p className="text-center">finding recipes made easy! <br></br>
type or select ingredients you have, and see 3 random recipes that has your ingredients.<br></br>
reduce decision paralysis over dinner!</p>
      </div>
      <div className="p-10">
        <h1 className="text-navy text-xl text-center p-3">Recipe Sources</h1>
        <ul className="text-center underline">
          <li> <a href='https://food52.com/recipes'>Food52</a> </li>
          <li> <a href='https://bbc.co.uk/food'>BBC Food</a> </li>
          <li> <a href='https://thewoksoflife.com'>The Woks of Life</a> </li>
          <li> <a href='https://omnivorescookbook.com'>Omnivores Cookbook</a> </li>
        </ul>
      </div>
    </Layout>
  );
};

export default About;