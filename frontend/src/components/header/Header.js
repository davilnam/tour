import React, {useEffect, useRef} from "react";
import { Container, Row, Button } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import './Header.css'

const Header = () => {
  const nav__links = [
    {
      path: '/home',
      display: 'Home'
    },
    {
      path: '/about',
      display: 'About'
    },
    {
      path: '/tours',
      display: 'Tours'
    },
  ]

  const headerRef = useRef(null)

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
      
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return window.removeEventListener('scroll', stickyHeaderFunc)
  }, [])

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className=".nav__wrapper d-flex align-items-center justify-content-between">
            {/*=========== logo begin============ */}
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            {/*=========== logo end============ */}

            {/*=========== nav begin============ */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => {
                  return(
                    <li className="nav__item" key={index}> 
                      <NavLink className={({isActive}) => isActive ? 'active_link' : ''}
                      to={item.path}>{item.display}</NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
            {/*=========== nav end============ */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                <Button className="btn secondary__btn">
                  <Link to='/login'>
                    Login
                  </Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to='/register'>
                    Register
                  </Link>
                </Button>
                
                <span className="mobile__menu">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>


          </div>

        </Row>
      </Container>
    </header>
  );
};

export default Header;
