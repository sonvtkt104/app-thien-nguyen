import {Table} from 'antd'
import "./index.css"

export function TableApp({
    columns,
    dataSource, 
}) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            rowClassName={() =>
                "row-table-app"
            }
            className="sb-image-optimize-table table-app-custom"
            pagination={{
                position: ["bottomLeft"],
                hideOnSinglePage: 1,
                defaultPageSize: 10,
                defaultCurrent: 1,
                showLessItems: 1,
                size: "small",
                showSizeChanger: 1,
                className:
                    "sb-ant-pagination ant-table-pagination ant-table-pagination-center",
                pageSizeOptions: [
                    5, 10, 20, 50, 100,
                ],
                showTotal: (total, range) => (
                    <span
                        style={{
                            color: "#38383A",
                        }}
                    >
                        {`Showing: ${range[0]}-${range[1]} of ${total} `}
                    </span>
                ),
            }}
        />
    )
}