import React, { Component } from 'react';
import Portlet from '../../../components/Portlet';
import Table from '../../../components/Table';

class Home extends Component {
  render() {
    return (
      <Portlet title="asdf" subTitle="asdfasdf" icon="user" color="font-green-sharp">
        <Table className="table table-striped table-bordered table-advance table-hover">
          <thead>
            <tr>
              <th>
                Company
              </th>
              <th className="hidden-xs">
                Contact
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                fasd
              </td>
              <td className="hidden-xs">
                Mike Nilson
              </td>
              <td>
                2560.60$
              </td>
            </tr>
          </tbody>
        </Table>
      </Portlet>
    );
  }
}

export default Home;
