import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom'
import { HeaderLayout, MenuLayout } from '../../layouts/home';
import { 
  ListComponent, 
  ListQueueComponent, 
  ListAcceptComponent, 
  ListDisAcceptComponent, 
  ListRegistrantion } 
from '../../shared/home';
import * as action_dayoff from '../../../actions/dayoff';
import * as action_typedayoff from '../../../actions/typeday';
import * as action_search from '../../../actions/search';
// import {message} from 'antd'
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import './styles.css'
var dateFormat = require('dateformat');
const cookies = new Cookies();
class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: "1",
      dataEdit: {},
      edit: false,
      visible: false,
      list: false,
    }
  }
  handleScreenCapture = (screenCapture) => {
    this.setState({
      screenCapture
    })
  }
  componentDidMount() {
    this.props.dispatch(action_dayoff.requestGetDayOff());
    this.props.dispatch(action_typedayoff.requestGetTypeDayOff());
    this.props.dispatch(action_typedayoff.requestGetLead());
    this.props.dispatch(action_dayoff.requestGetMail());
    this.props.dispatch(action_dayoff.requestGetListQueue());
    this.props.dispatch(action_dayoff.requestGetListAccept());
    this.props.dispatch(action_dayoff.requestGetListDisAccept());
    this.props.dispatch(action_dayoff.requestGetDay());
  }
  onViews = () => {
    this.setState({ views: "2" })
  }
  onAddDayOff = (data) => {
    this.props.dispatch(action_dayoff.requestCreateDayOff(data));
    this.setState({ edit: false, visible: false })
  }
  onListQueue = () => {
    this.setState({ views: "1" })
  }
  onDisListAccept = () => {
    this.setState({ views: "4" })
  }
  onList = () => {
    this.setState({ views: "3" })
  }
  onStatistical = () => {
    this.setState({ views: "5" })
  }
  onAccept = (data) => {
    this.props.dispatch(action_dayoff.requestUpdateAccept(data));
  }
  onSendAccept = (data) => {
    this.props.dispatch(action_dayoff.requestSendAccept(data));
  }
  onDisAccept = (data) => {
    this.props.dispatch(action_dayoff.requestDisAccept(data));
  }
  onEdit = (id) => {
    let item = [...this.props.dayoff].filter(item => item.id === id);
    if (item.length > 0) {
      this.setState({ dataEdit: item[0], edit: true, visible: true })
    }
  }
  onUpdateDay = (data) => {
    this.props.dispatch(action_dayoff.requestUpdateDay(data));
    this.setState({ edit: false, visible: false })
  }
  onCheckModal = () => {
    this.setState({ visible: false, edit: false })
  }
  onSearchApprovedDay = (data) => {
    this.props.dispatch(action_search.requestSearchApprovedDay(data));
  }
  onSearchApprovedMonth = (data) => {
    this.props.dispatch(action_search.requestSearchApprovedMonth(data));
  }
  onSearchApprovedYear = (data) => {
    this.props.dispatch(action_search.requestSearchApprovedYear(data));
  }
  onSearchDisApprovedDay = (data) => {
    this.props.dispatch(action_search.requestSearchDisApprovedDay(data));
  }
  onSearchDisApprovedMonth = (data) => {
    this.props.dispatch(action_search.requestSearchDisApprovedMonth(data));
  }
  onSearchDisApprovedYear = (data) => {
    this.props.dispatch(action_search.requestSearchDisApprovedYear(data));
  }
  onSearchPendingDay = (data) => {
    this.props.dispatch(action_search.requestSearchPendingDay(data));
  }
  onSearchPendingMonth = (data) => {
    this.props.dispatch(action_search.requestSearchPendingMonth(data));
  }
  onSearchPendingYear = (data) => {
    this.props.dispatch(action_search.requestSearchPendingYear(data));
  }
  onSearchQueueAcceptDay = (data) => {
    this.props.dispatch(action_search.requestSearchQueueDay(data));
  }
  onSearchQueueAcceptMonth = (data) => {
    this.props.dispatch(action_search.requestSearchQueueMonth(data));
  }
  onSearchQueueAcceptYear = (data) => {
    this.props.dispatch(action_search.requestSearchQueueYear(data));
  }
  onShowTable = () => {
    this.setState({
      views: "5"
    })
  }
  covertArrayNew(data) {
    let ItemNew = [];
    data.map(item => {
      ItemNew = item.attributes.time.map(timeItem => {
        return {
          id: timeItem.id,
          title: timeItem.at_time,
          date: dateFormat(timeItem.time_details, 'yyyy-mm-dd'),
          email: item.attributes.user.name
        }
      })
      return [];
    })
    return ItemNew;
  }
  render() {
    const mainContent = () => {
      if (this.state.views === "1") {
        return (
          <ListQueueComponent
            data={cookies.get('data') !== undefined
              ? this.props.list
              : ''}
            onSearchDay={this.onSearchApprovedDay}
            onSearchMonth={this.onSearchApprovedMonth}
            onSearchYear={this.onSearchApprovedYear}>
          </ListQueueComponent>
        )
      }
      if (this.state.views === "2") {
        return (
          <ListComponent
            data={cookies.get('data') !== undefined
              ? this.props.dayoff
              : ''}
            onSearchDay={this.onSearchPendingDay}
            onSearchMonth={this.onSearchPendingMonth}
            onSearchYear={this.onSearchPendingYear}
            onEdit={this.onEdit}>
          </ListComponent>
        )
      }
      if (this.state.views === "3") {
        return (
          <ListAcceptComponent
            data={cookies.get('data') !== undefined
              ? this.props.listaccept
              : ''}
            onAccept={this.onAccept}
            onDisAccept={this.onDisAccept}
            onSendAccept={this.onSendAccept}
            onSearchDay={this.onSearchQueueAcceptDay}
            onSearchMonth={this.onSearchQueueAcceptMonth}
            onSearchYear={this.onSearchQueueAcceptYear}>            
          </ListAcceptComponent>
        )
      }
      if (this.state.views === "4") {
        return (
          <ListDisAcceptComponent
            data={cookies.get('data') !== undefined
              ? this.props.disaccept
              : ''}
            onSearchDay={this.onSearchDisApprovedDay}
            onSearchMonth={this.onSearchDisApprovedMonth}
            onSearchYear={this.onSearchDisApprovedYear}>
          </ListDisAcceptComponent>
        )
      }
      if (this.state.views === "5") {
        return (
          <ListRegistrantion 
            data={cookies.get('data') !== undefined ? this.props.listregis : ''}>
          </ListRegistrantion>
        )
      }
    }
    return (
      <div className="wrapper">
        <HeaderLayout></HeaderLayout>
        <div className="b-content">
          <div className="b-right-content">
            <MenuLayout
              dayoff={this.props.dayoff}
              data={this.props.leader}
              leadmail={this.props.mail}
              onDisAccept
              ={this.onDisListAccept}
              onCheckModal
              ={this.onCheckModal}
              visible={this.state.visible}
              edit={this.state.edit}
              dataEdit={this.state.dataEdit}
              onUpdateDay
              ={this.onUpdateDay}
              onViews={this.onViews}
              onListQueue={this.onListQueue}
              onList={this.onList}
              onStatistical={this.onStatistical}
              typedayoff={this.props.typedayoff}
              onAddDayOff={this.onAddDayOff}></MenuLayout>
            {mainContent()}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dayoff: state.dayoff.all,
    typedayoff: state.typedayoff.all,
    login: state.login.user,
    leader: state.lead.all,
    list: state.listqueue.all,
    listaccept: state.listaccept.all,
    disaccept: state.disaccept.all,
    mail: state.mail.all,
    isList: state.dayoff.isList,
    listregis: state.listregisday.all,
    filter: state.listregisday.filter
  }
}
export default connect(mapStateToProps, null)(HomeComponent);