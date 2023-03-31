import React from 'react';
import Layout from './../components/Layout/Layout';

const Policy = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img src="/images/about.jpeg" alt="contactus" style={{ width: '100%' }} />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">POLICY</h1>
                    <p className="text-justify mt-2">
                        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. SED DO EIUSMOD
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Policy;
