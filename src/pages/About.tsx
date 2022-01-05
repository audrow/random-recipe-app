import * as React from 'react'
import Layout from "../components/Layout";

export const About = () => {
  return (
    <Layout>
      <div>
          <h1 className="text-navy text-xl text-center p-3">about</h1>
          <p className="text-center"> finding recipes made dasy. reduce decision paralysis over dinner!</p>
      </div>
      <div className="p-10">
          <h1 className="text-navy text-xl text-center p-3">recipe sources</h1>
              <p className="text-center">
                  food52.com <br></br>
                  bbc.co.uk/food <br></br>
                  thewoksoflife.com <br></br>
                  omnivorescookbook.com
              </p>
      </div>
    </Layout>
  );
};
