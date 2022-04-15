import { ElementType } from 'react';
import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  href: string;
  icon: ElementType;
}

export function NavLink({ children, href, icon, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}