function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var s = {"Pagination":"_1UCyD","pagesBox":"_1P8jL","pageNumber":"_2GUTT","active":"_3K1Ar","ellipsisFirstBtn":"_1Y9vH","ellipsisLastBtn":"_V19Th","firstPageBtn":"_1BVmI","prevPageBtn":"_1wymU","nextPageBtn":"_AzY_P","lastPageBtn":"_iLczd","disabled":"_1R05K"};

function Pagination(_ref) {
  var _ref$totalPageCount = _ref.totalPageCount,
      totalPageCount = _ref$totalPageCount === void 0 ? 1 : _ref$totalPageCount,
      _ref$pageSize = _ref.pageSize,
      pageSize = _ref$pageSize === void 0 ? 1 : _ref$pageSize,
      _ref$pageActiveNumber = _ref.pageActiveNumber,
      pageActiveNumber = _ref$pageActiveNumber === void 0 ? 1 : _ref$pageActiveNumber,
      _ref$countShowItem = _ref.countShowItem,
      countShowItem = _ref$countShowItem === void 0 ? 1 : _ref$countShowItem,
      _ref$firstPageBtn = _ref.firstPageBtn,
      firstPageBtn = _ref$firstPageBtn === void 0 ? true : _ref$firstPageBtn,
      _ref$lastPageBtn = _ref.lastPageBtn,
      lastPageBtn = _ref$lastPageBtn === void 0 ? true : _ref$lastPageBtn,
      _ref$prevPageBtn = _ref.prevPageBtn,
      prevPageBtn = _ref$prevPageBtn === void 0 ? false : _ref$prevPageBtn,
      _ref$nextPageBtn = _ref.nextPageBtn,
      nextPageBtn = _ref$nextPageBtn === void 0 ? false : _ref$nextPageBtn,
      _ref$ellipsisBtn = _ref.ellipsisBtn,
      ellipsisBtn = _ref$ellipsisBtn === void 0 ? false : _ref$ellipsisBtn,
      _ref$showLastPage = _ref.showLastPage,
      showLastPage = _ref$showLastPage === void 0 ? false : _ref$showLastPage,
      _ref$changePage = _ref.changePage,
      changePage = _ref$changePage === void 0 ? new Function() : _ref$changePage;
  if (totalPageCount / pageSize < pageActiveNumber) pageActiveNumber = 1;

  var _useState = React.useState([]),
      paginationItemList = _useState[0],
      setPaginationItemList = _useState[1];

  var _useState2 = React.useState(1),
      portionCount = _useState2[0],
      setPortionCount = _useState2[1];

  var _useState3 = React.useState(1),
      activePortion = _useState3[0],
      setActivePortion = _useState3[1];

  React.useEffect(function () {
    var countPagination = Math.ceil(totalPageCount / pageSize);
    var portionCount = Math.ceil(countPagination / countShowItem);
    var activePortion = Math.ceil(pageActiveNumber / countShowItem) - 1;
    var paginationItemList = [];

    for (var i = 1; i <= countPagination; i++) {
      paginationItemList.push(i);
    }

    setPaginationItemList(paginationItemList);
    setPortionCount(portionCount);
    setActivePortion(activePortion);
  }, [totalPageCount, pageSize, pageActiveNumber]);

  var setActivePage = function setActivePage(e) {
    switch (e.target.innerHTML) {
      case ' « ':
        if (activePortion > 1) changePage(1);
        break;

      case ' ‹ ':
        if (pageActiveNumber !== 1) if (pageActiveNumber > 1) changePage(pageActiveNumber - 1);
        break;

      case ' › ':
        if (pageActiveNumber !== paginationItemList.length) changePage(pageActiveNumber + 1);
        break;

      case ' » ':
        if (activePortion !== portionCount - 1) changePage(paginationItemList.length);
        break;

      case ' ... ':
        if (e.target.hasAttribute('prev')) {
          changePage((activePortion - 1) * countShowItem + 1);
        } else {
          changePage((activePortion + 1) * countShowItem + 1);
        }

        break;

      default:
        changePage(e.target.innerHTML);
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: s.Pagination
  }, firstPageBtn && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.firstPageBtn + ' ' + (activePortion > 1 ? false : s.disabled)
  }, ' ', '«', ' '), prevPageBtn && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.prevPageBtn + ' ' + (pageActiveNumber === 1 ? s.disabled : false)
  }, ' ', '‹', ' '), /*#__PURE__*/React__default.createElement("div", {
    className: s.pagesBox
  }, ellipsisBtn && activePortion > 0 && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.ellipsisFirstBtn,
    prev: ""
  }, ' ', '...', ' '), paginationItemList.filter(function (el) {
    return el > activePortion * countShowItem && el < activePortion * countShowItem + countShowItem + 1;
  }).map(function (el) {
    return el === pageActiveNumber ? /*#__PURE__*/React__default.createElement("div", {
      key: el,
      className: s.pageNumber + ' ' + s.active
    }, el) : /*#__PURE__*/React__default.createElement("div", {
      key: el,
      onClick: setActivePage,
      className: s.pageNumber
    }, el);
  }), ellipsisBtn && activePortion + 1 < portionCount && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.ellipsisLastBtn,
    next: ""
  }, ' ', '...', ' '), showLastPage && ellipsisBtn && activePortion < portionCount - 1 && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.pageNumber
  }, paginationItemList.length)), nextPageBtn && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.nextPageBtn + ' ' + (pageActiveNumber === paginationItemList.length ? s.disabled : false)
  }, ' ', '›', ' '), lastPageBtn && /*#__PURE__*/React__default.createElement("div", {
    onClick: setActivePage,
    className: s.lastPageBtn + ' ' + (activePortion === portionCount - 1 ? s.disabled : false)
  }, ' ', '»', ' '));
}

module.exports = Pagination;
//# sourceMappingURL=index.js.map
