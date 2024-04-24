import NoDataLogo from "../../assets/images/no-data.png";
function NoData() {
    return ( <img style={{
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: '50px'
    }} src={NoDataLogo} className="m-auto w-25" /> )
}

export default NoData;