import * as React from 'react';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-1'></div>
                <div className='col-sm-10'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
