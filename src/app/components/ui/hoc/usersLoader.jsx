import PropTypes from "prop-types";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
    loadbookMarksList,
    getBookMarksLoadingStatus
} from "../../../store/bookMark";
import {
    getCurrentUserId,
    getDataStatus,
    loadUsersList
} from "../../../store/users";

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());
    const bookMarksStatus = useSelector(getBookMarksLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
        dispatch(loadbookMarksList(currentUserId));
    }, []);

    if (!dataStatus && bookMarksStatus) return "Loading ...";

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UsersLoader;
