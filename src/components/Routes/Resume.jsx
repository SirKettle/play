import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
import Content from '../Content/Content';

const columnsCopy = [`
## Resume

I specialise in front­end/client­-side development for web and mobile.

I am currently working with _UBS Wealth Management_ developing customer facing products in financial services. Using the latest front­end technologies including ReactJs, Node, Redux, RxJs, HTML5, CSS3, and CSS modules.

I spend most of my time writing JavaScript (ES6/7/2015), but still love to get my CSS fix when I get the chance.

I’m happiest working with responsive designs and working in an Agile development environment.

Previously I spent two years with Fathom predominantly building a trading platform, using AngularJs and React. Prior to Fathom, I was employed by Tag:cmd as a Senior Front End Developer, working on a hugely complex single page app using OO JavaScript, Backbone.js, node.js, twitter bootstrap, LESS, communicating with a RESTful API.

Before Tag, I was a Senior Developer at We R Interactive, building social games for multiple platforms, including Lyroke and I AM PLAYR.

Having come from a creative background I also have a keen eye for detail. Previously I was in charge of a small creative development team working on multiple projects including consumer facing white labelled systems in both mortgage comparison and corporate social networking.

I am highly motivated, passionate about technology, approach challenges logically and grasp new ideas quickly.

---

### WORK

#### Javascript Engineer (Freelance) at **UBS Wealth Management** - London, UK  
_February 2016 – Present_
   
Building a confidential, sophisticated complex data driven web application ­ using OO JavaScript, React, RxJs, Redux, Webpack, CSS modules, Gulp, HTML5, CSS3, Responsive­design techniques communicating with our RESTful API gateway.
Working closely with BAs, solution architects, developers, UX and design in an agile environment using both SCRUM and Kanban.

---

#### Senior Front End Developer (Freelance) at **Fathom** - London, UK  
_February 2014 – February 2016 (2 years)_

Building reusable components for large­scale data­driven web applications in the financial sector ­ using OO JavaScript, AngularJs, React, SASS, Grunt, Git, HTML5, CSS3, Responsive­design techniques communicating with third party RESTful APIs.
Working together with other freelance developers, designers, and the core Fathom team at every stage of the product lifecycle in an agile environment.


`];

function Resume() {
  return (
    <Layout>
      <Content markdown={columnsCopy[0]} />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Resume);
