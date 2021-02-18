import React, { useEffect, useState } from 'react'
import s from './Pagination.module.scss'

export function Pagination({
  totalPageCount = 1,
  pageSize = 1,
  pageActiveNumber = 1,
  countShowItem = 1,
  firstPageBtn = true,
  lastPageBtn = true,
  prevPageBtn = false,
  nextPageBtn = false,
  ellipsisBtn = false,
  showLastPage = false,
  changePage = new Function()
}) {
  // проверка что активная страница не больше колличества страниц.
  if (totalPageCount / pageSize < pageActiveNumber) pageActiveNumber = 1
  // массив страниц пагинации.
  const [paginationItemList, setPaginationItemList] = useState([])
  // общее количество порций.
  const [portionCount, setPortionCount] = useState(1)
  // активная порция.
  const [activePortion, setActivePortion] = useState(1)
  // инициализация paginationItemList / paginationItemList / activePortion.
  useEffect(() => {
    const countPagination = Math.ceil(totalPageCount / pageSize)
    const portionCount = Math.ceil(countPagination / countShowItem)
    const activePortion = Math.ceil(pageActiveNumber / countShowItem) - 1
    const paginationItemList = []
    for (let i = 1; i <= countPagination; i++) {
      paginationItemList.push(i)
    }
    setPaginationItemList(paginationItemList)
    setPortionCount(portionCount)
    setActivePortion(activePortion)
  }, [totalPageCount, pageSize, pageActiveNumber])
  // обработка кликов в пагинации.
  const setActivePage = (e) => {
    switch (e.target.innerHTML) {
      case ' « ':
        if (activePortion > 1) changePage(1)
        break
      case ' ‹ ':
        if (pageActiveNumber !== 1)
          if (pageActiveNumber > 1) changePage(pageActiveNumber - 1)
        break
      case ' › ':
        if (pageActiveNumber !== paginationItemList.length)
          changePage(pageActiveNumber + 1)
        break
      case ' » ':
        if (activePortion !== portionCount - 1)
          changePage(paginationItemList.length)
        break
      case ' ... ':
        if (e.target.hasAttribute('prev')) {
          changePage((activePortion - 1) * countShowItem + 1)
        } else {
          changePage((activePortion + 1) * countShowItem + 1)
        }
        break
      default:
        changePage(e.target.innerHTML)
    }
  }

  return (
    <div className={s.Pagination}>
      {firstPageBtn && (
        <div
          onClick={setActivePage}
          className={
            s.firstPageBtn + ' ' + (activePortion > 1 ? false : s.disabled)
          }
        >
          {' '}
          {'«'}{' '}
        </div>
      )}
      {prevPageBtn && (
        <div
          onClick={setActivePage}
          className={
            s.prevPageBtn + ' ' + (pageActiveNumber === 1 ? s.disabled : false)
          }
        >
          {' '}
          {'‹'}{' '}
        </div>
      )}

      <div className={s.pagesBox}>
        {ellipsisBtn && activePortion > 0 && (
          <div onClick={setActivePage} className={s.ellipsisFirstBtn} prev=''>
            {' '}
            {'...'}{' '}
          </div>
        )}
        {paginationItemList
          .filter(
            (el) =>
              el > activePortion * countShowItem &&
              el < activePortion * countShowItem + countShowItem + 1
          )
          .map((el) =>
            el === pageActiveNumber ? (
              <div key={el} className={s.pageNumber + ' ' + s.active}>
                {el}
              </div>
            ) : (
              <div key={el} onClick={setActivePage} className={s.pageNumber}>
                {el}
              </div>
            )
          )}
        {ellipsisBtn && activePortion + 1 < portionCount && (
          <div onClick={setActivePage} className={s.ellipsisLastBtn} next=''>
            {' '}
            {'...'}{' '}
          </div>
        )}
        {showLastPage && ellipsisBtn && activePortion < portionCount - 1 && (
          <div onClick={setActivePage} className={s.pageNumber}>
            {paginationItemList.length}
          </div>
        )}
      </div>

      {nextPageBtn && (
        <div
          onClick={setActivePage}
          className={
            s.nextPageBtn +
            ' ' +
            (pageActiveNumber === paginationItemList.length
              ? s.disabled
              : false)
          }
        >
          {' '}
          {'›'}{' '}
        </div>
      )}
      {lastPageBtn && (
        <div
          onClick={setActivePage}
          className={
            s.lastPageBtn +
            ' ' +
            (activePortion === portionCount - 1 ? s.disabled : false)
          }
        >
          {' '}
          {'»'}{' '}
        </div>
      )}
    </div>
  )
}

export default Pagination
