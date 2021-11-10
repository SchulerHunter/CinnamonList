import React from 'react'

import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import AddForm from './components/AddForm'
import About from './components/About'
import Home from './components/Home'
import Content from './components/Content'
import {getHierarchy, getIDs, getTabs, getItem} from './components/utility/apiConnection'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1, // 1 with data 0 = Home, 1 with data not 0 = Content, 2 = add form, 3 = about page
      data: 0, // Specifies which definitions to show when page = 1, same as ID column in database
      subTabs:{},
      IDs:{},
      hierarchy:{},
      subHierarchy:{},
      content:{}
    }
  }

  // Fetchs all one time calls when component mounts
  async componentDidMount() {
    getTabs().then((result) => {
      this.setState({subTabs:result})
    })
    getIDs().then((result) => {
      this.setState({IDs:result})
    })
    getHierarchy().then((result) => {
      this.setState({hierarchy:result})
    })
  }

  // Callback to change page when a new page is selected from the navbar
  navbarPageCallback = (pageNumber) => {
    this.setState({
      page:pageNumber,
      data:0
    })
  }

  // Callback to change the data when new data is selected from the hierarchy or navbar
  dataCallback = (dataID) => {
    var subHierarchy = this.state.subHierarchy
    // Checks that the hierarchy list doesn't change unless a new top level term is selected
    if (dataID in Object.keys(this.state.hierarchy)) {
      subHierarchy = this.state.hierarchy[dataID]
    }

    getItem(dataID).then((result) => {
      this.setState({
        data:dataID,
        content:result,
        subHierarchy:subHierarchy
      })
    })
  }

  render() {
    return (
      <div>
        <div className="mainContent">
        <Navbar 
          page={this.state.page}
          subTabs={this.state.subTabs}
          pageCallback={this.navbarPageCallback}
          dataCallback={this.dataCallback}
        />
          { this.state.page === 1 && this.state.data === 0 && <Home /> }
          { this.state.page === 1 && this.state.data !== 0 &&
          <Content
            content={this.state.content}
            hierarchy={this.state.subHierarchy}
            IDs={this.state.IDs}
            dataCallback={this.dataCallback}
          /> }
          { this.state.page === 2 && 
          <AddForm
          /> }
          { this.state.page === 3 && <About /> }
        </div>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    )
  }
}
