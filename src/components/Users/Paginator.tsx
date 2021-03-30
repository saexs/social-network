import React, { useState, FC } from 'react';
import classes from './Users.module.scss';
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/redaxstore'

type PropsType = {
    className?: string | boolean
    onPageChanged: (pageNumber: number) => void
}

const Paginator: FC<PropsType> = ({onPageChanged}) => {
    const totalUsersCount = useSelector((state: RootState): number => state.usersPage.totalUsersCount)
    const pageSize = useSelector((state: RootState): number => state.usersPage.pageSize)
    const currentPage = useSelector((state: RootState): number => state.usersPage.currentPage)

    const [currentInterval, setCurrentInterval] = useState<number>(1);
    const prevPage = (): void => {
        setCurrentInterval(currentInterval - 1)
    }
    const nextPage = (): void => {
        setCurrentInterval(currentInterval + 1)
    }

    let pagesCount: number = Math.ceil(totalUsersCount / pageSize);
    let totalIntervalCount = Math.ceil(pagesCount / pageSize)
    let pages = [] as Array<number>;
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let left: number = (pageSize * currentInterval + 1) - pageSize;
    let right: number = (pageSize * currentInterval + 1) - 1;
    debugger
    
    return (<div className={classes.paginator}>
        <button className={classes.paginatorButton} disabled={currentInterval === 1} onClick={prevPage}>PREV</button>
        {pages.map((p: number) => {
            if (p >= left && p <= right) {
                debugger
                return (
                    <span className={(currentPage === p) as any && classes.selectedPage} 
                        onClick={(e) => { onPageChanged(p) }}>{p}</span>
                )
            }
            return false
        })}
        <button className={classes.paginatorButton} disabled={currentInterval === totalIntervalCount} onClick={nextPage}>NEXT</button>
    </div>
    );
}

export default Paginator;