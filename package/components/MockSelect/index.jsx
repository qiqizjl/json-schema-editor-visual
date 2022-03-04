import React from 'react';
import {Input, AutoComplete, Icon} from 'antd';
import PropTypes from 'prop-types';

const Option = AutoComplete.Option;
import LocaleProvider from '../LocalProvider/index.js';
import {EditOutlined} from "@ant-design/icons";

export default class MockSelect extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      mock: ''
    };
    this.mock = context.Model.__jsonSchemaMock || [];
  }

  static propTypes = {
    schema: PropTypes.object,
    showEdit: PropTypes.func,
    onChange: PropTypes.func
  };

  render() {
    // const children = [];
    const {schema} = this.props;
    const children = this.mock.map((item) => {
      return {value: item.mock}
    });
    return (
      <div>
        <AutoComplete
          className="certain-category-search"
          dropdownMatchSelectWidth={false}
          options={children}
          // optionLabelProp="value"
          filterOption={true}
          value={schema.mock ? schema.mock.mock : ''}
          onChange={this.props.onChange}
          disabled={schema.type === 'object' || schema.type === 'array'}
        >
          <Input
            placeholder={LocaleProvider('mock')}
            addonAfter={<EditOutlined
              onClick={(e) => {
                console.log("触发了onClick=>>>>")
                this.props.showEdit()
              }}
              onMouseDown={(e) => {
                console.log("触发了onMouseDown=>>>>")
                e.stopPropagation();
                e.preventDefault();
              }}
            />}
          />
        </AutoComplete>
      </div>
    );
  }
}

MockSelect.contextTypes = {
  Model: PropTypes.object
};
