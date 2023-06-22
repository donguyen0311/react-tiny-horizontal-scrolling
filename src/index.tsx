/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/react';
import classNames from 'classnames';

function outerWidth(el: HTMLDivElement) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
}

const ArrowLeft = () => <span>{'<'}</span>;
const ArrowRight = () => <span>{'>'}</span>;

export interface HorizontalScrollingProps {
  data: React.ReactNode[];
  arrowLeft?: React.ReactNode;
  arrowRight?: React.ReactNode;
  scrollDuration?: number;
  isAutoHiddenArrow?: boolean;
  initScrollItem?: number;
  className?: string;
}

export const HorizontalScrolling = (props: HorizontalScrollingProps) => {
  const {
    data,
    scrollDuration,
    isAutoHiddenArrow,
    initScrollItem,
    className,
  } = props;
  const [itemSize, setItemSize] = React.useState<number>(0);
  const [menuWrapperSize, setMenuWapperSize] = React.useState<number>(0);
  const [isShowLeftPaddle, setShowLeftPaddle] = React.useState<boolean>(false);
  const [isShowRightPaddle, setShowRightPaddle] = React.useState<boolean>(
    false
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const itemsLength = data.length;
  const paddleMargin = 0;

  const getMenuWrapperSize = React.useCallback(() => {
    return wrapperRef?.current?.offsetWidth ?? 0;
  }, [wrapperRef]);

  const setMenuWrapperSize = React.useCallback(() => {
    setMenuWapperSize(getMenuWrapperSize());
  }, [getMenuWrapperSize]);

  const getMenuPosition = React.useCallback(() => {
    return menuRef?.current?.scrollLeft ?? 0;
  }, []);

  const handleScrollMenu = React.useCallback(() => {
    let menuSize = itemsLength * itemSize;
    let menuInvisibleSize = menuSize - menuWrapperSize;

    // get how much have we scrolled so far
    let menuPosition = getMenuPosition();

    let menuEndOffset = menuInvisibleSize - paddleMargin;

    // show & hide the paddles
    // depending on scroll position
    if (menuPosition <= paddleMargin) {
      setShowLeftPaddle(false);
      setShowRightPaddle(true);
    } else if (menuPosition < menuEndOffset) {
      // show both paddles in the middle
      setShowLeftPaddle(true);
      setShowRightPaddle(true);
    } else if (menuPosition >= menuEndOffset) {
      setShowLeftPaddle(true);
      setShowRightPaddle(false);
    }
  }, [getMenuPosition, itemsLength, itemSize, menuWrapperSize]);

  const handleClickLeft = React.useCallback(() => {
    let menuPosition = getMenuPosition();
    menuRef?.current?.scrollTo({
      left: menuPosition - (scrollDuration || 0),
      behavior: 'smooth',
    });
  }, [getMenuPosition, scrollDuration]);

  const handleClickRight = React.useCallback(() => {
    let menuPosition = getMenuPosition();
    menuRef?.current?.scrollTo({
      left: menuPosition + (scrollDuration || 0),
      behavior: 'smooth',
    });
  }, [getMenuPosition, scrollDuration]);

  React.useEffect(() => {
    setMenuWrapperSize();
    window.addEventListener('resize', setMenuWrapperSize);

    if (isAutoHiddenArrow) {
      handleScrollMenu();
      menuRef?.current?.addEventListener('scroll', handleScrollMenu);
    }

    return () => {
      window.removeEventListener('resize', setMenuWrapperSize);
      if (isAutoHiddenArrow) {
        menuRef?.current?.removeEventListener('scroll', handleScrollMenu);
      }
    };
  }, [setMenuWrapperSize, handleScrollMenu, isAutoHiddenArrow]);

  React.useEffect(() => {
    setTimeout(() => {
      if (itemRef.current) {
        let itemSize = outerWidth(itemRef.current);
        setItemSize(itemSize);
      }
    }, 500);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      if (itemRef.current) {
        let itemSize = outerWidth(itemRef.current);
        if (initScrollItem !== null && initScrollItem !== undefined) {
          menuRef?.current?.scrollTo({
            left: itemSize * initScrollItem,
            behavior: 'smooth',
          });
        }
      }
    }, 500);
  }, [initScrollItem]);

  const containerStyle = css`
    position: relative;
    display: flex;
    width: 100%;

    .horizontal-scrolling-menu {
      display: flex;
      white-space: nowrap;
      overflow-x: visible;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      margin-left: 28px;
      margin-right: 28px;

      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .paddle {
      position: absolute;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      width: 40px;
    }

    .left-paddle {
      background: linear-gradient(
        90deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
      left: 10px;
      display: flex;
      justify-content: flex-start;
    }

    .right-paddle {
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
      right: 10px;
      display: flex;
      justify-content: flex-end;
    }

    .hidden {
      display: none;
    }
  `;

  return (
    <div ref={wrapperRef} css={containerStyle} className={className}>
      <div ref={menuRef} className="horizontal-scrolling-menu">
        {data.map((item, index) => (
          <div ref={itemRef} key={index} className="horizontal-scrolling-item">
            {item}
          </div>
        ))}
      </div>
      <div className="paddles">
        <div
          className={classNames('left-paddle paddle', {
            hidden: isAutoHiddenArrow && !isShowLeftPaddle,
          })}
          onClick={handleClickLeft}
        >
          <ArrowLeft />
        </div>
        <div
          className={classNames('right-paddle paddle', {
            hidden: isAutoHiddenArrow && !isShowRightPaddle,
          })}
          onClick={handleClickRight}
        >
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

HorizontalScrolling.defaultProps = {
  scrollDuration: 150,
  isAutoHiddenArrow: false,
};
