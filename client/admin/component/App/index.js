
import './index.css';

export default class extends React.Component { 
    constructor(props) {
        super(props)
    }

    render() {
        const { children } = this.props;
        console.log(this.props)
        return (
            <div className="c-app">{this.props.children}</div>
        )
    }
}