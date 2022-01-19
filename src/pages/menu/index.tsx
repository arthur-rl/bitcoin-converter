import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <div className="title text-center mt-5 mb-2">
                <h1 className="display-3">Technical Test Tasks</h1>
                <h4 className="display-6">Choose from below:</h4>
            </div>

            <div style={{position: "fixed", left: "50%", transform: "translate(-50%)", display: "flex", flexDirection: "column"}}className="text-center mt-4 mb-5 w-50">
                <Link className="btn btn-primary mb-3"to="/task1">Task 1</Link>
                <Link className="btn btn-primary"to="/task2">Task 2</Link>
            </div>
        </>
    )
}