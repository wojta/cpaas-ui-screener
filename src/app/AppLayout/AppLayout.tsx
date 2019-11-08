import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavList, NavItem, NavVariants, Page, PageHeader, SkipToContent, Brand, Dropdown, DropdownToggle } from '@patternfly/react-core';
import { routes } from '@app/routes';
import pfLogo from '../../svgs/PF-Masthead-Logo.svg';
import { CaretDownIcon } from '@patternfly/react-icons';
import './AppLayout.css';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const logoProps = {
    href: '/',
    target: '_blank'
  };
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const logo: React.ReactNode = <Brand src={pfLogo} alt="Patternfly Logo" />;
  const Navigation = (
    <Nav id="nav-primary-simple">
      <NavList id="nav-list-simple" variant={NavVariants.horizontal}>
        {routes.map((route, idx) => {
          return (
            route.label && (
              <NavItem key={`${route.label}-${idx}`} id={`${route.label}-${idx}`}>
                <NavLink exact={true} to={route.path} activeClassName="pf-m-current">
                  {route.label}
                </NavLink>
              </NavItem>
            )
          );
        })}
      </NavList>
    </Nav>
  );

  const Avatar = (
    <Dropdown
        isOpen={false}
        toggle={<DropdownToggle iconComponent={CaretDownIcon} className="userName">Username</DropdownToggle>}
      />
  )

  const Header = (
    <PageHeader
      logo={logo}
      logoProps={logoProps}
      showNavToggle={false}
      isNavOpen={isNavOpen}
      topNav={Navigation}
      avatar={Avatar}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const PageSkipToContent = <SkipToContent href="#primary-app-container">Skip to Content</SkipToContent>;
  return (
    <Page
      mainContainerId="primary-app-container"
      header={Header}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}
    >
      {children}
    </Page>
  );
};

export { AppLayout };
