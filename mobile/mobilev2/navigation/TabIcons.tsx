import { AntDesign, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

export function FATabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export function ADTabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

export function FTabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={24} style={{ marginBottom: -3 }} {...props} />;
}

export function ITabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}
