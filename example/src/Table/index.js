import React from 'react'
import { Table } from 'react-reusable-components-durgapatra'
import columns from './column'

const TableExample = () => {
  return (
    <Table
      columns={columns()}
      dataSource={[
        {
          name: 'John Brown',
          age: '32',
          address: 'Sidney No. 1 Lake Park',
          active: true
        }
      ]}
      rowKey={(record) => record.id}
      rowExpandable={true}
      expandedRowRender={(record) => (
        <span>
          My name is {record.name}, I am {record.age} years old, living in $
          {record.address}.
        </span>
      )}
    />
  )
}

export default TableExample
