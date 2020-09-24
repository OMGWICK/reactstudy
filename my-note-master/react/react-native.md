# react-native

## css

没有样式继承

## 路由导航

*react-navgation*

*react-navgation-stack*

*react-navgation-tabs*

*react-native-swiper*

轮播图,用插件

## flex布局

![flex1](img/flex1.jpg)

![flex2](img/flex2.jpg)

![flex3](img/flex3.jpg)

![flex4](img/flex4.jpg)

![flex5](img/flex5.jpg)



## 动画

```tsx
import React, {useState, useEffect} from 'react';
import {View, Animated, Text} from 'react-native';
function FadeView(props: any) {
  const [fadeAnima] = useState(new Animated.Value(0)); //初始透明度为0
  useEffect(() => {
    //动画中的变量值fadeAnima
    Animated.timing(fadeAnima, {
      //定时动画,同时值变为1,也就是不透明
      toValue: 1,
      //动画持续时间
      duration: 3000,
      //是否使用驱动
      useNativeDriver: true,
      //开始动画
    }).start();
  }, [fadeAnima]);
  return (
    //使用专用的动画组件,将透明度绑定到动画变量值,结构出之前的style,不然要覆盖
    <Animated.View style={{...props.style, opacity: fadeAnima}}>
      {props.children}
    </Animated.View>
  );
}
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          fade
        </Text>
      </FadeView>
    </View>
  );
};

```



## app.json

displayname 生成的apk名字

## Componets笔记

### FlatList

分组

### Picker

下拉框,Picker.Item,相当于selection的option

### ActivityIndicator

加载动画

### ProgressBarAndroid

应用加载进度条

### RefreshControl

显示加载按钮

### ScrollView

滚动视图,有一个长的内容放在其中

### SectionList

相当于flatlist的高级版本

### Slider

滑块,未来将会被移除

### Switch

一个开关

### Text

放文本的地方

### TextInput

文本输入

### TouchableHighlight

能正常响应触摸操作,触摸高亮

### TouchableNativeFeedback

渲染触摸反馈

### TouchableOpacity

触摸透明度降低

### WebView

直接嵌入一个html , [react-native-community/react-native-webview](https://github.com/react-native-community/react-native-webview) 模块在这个当中

### Image

```tsx
<Image source={{uri: 'app_icon'}} style={{width: 40, height: 40}} />
<Image source={require('./my-icon.png')} />;
```



## APIS笔记

### Alert

启用一个对话框

### Animated

需要用到导出的动画组件才能使用

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`

**state.interpolate,映射**

### AppState

告诉你在前台还是后台

### AsyncStorage

可用来代替localstorage

### BackHandler

监听后退按钮

### CameraRoll

访问本地相册

### Clipboard

读取剪贴板类容

### DatePickerAndroid

日历

### Dimensions

获取屏幕宽高

### ImageEditor

裁剪图片

### Keyboard

控制键盘

### PermissionsAndroid

询问权限

## 布局问题

```tsx
  father: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    flexBasis: 100,
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
```

## 轮播组件

```js
import Swiper from 'react-native-swiper';
      <Swiper>
        <View style={[styles.flex1]}>{elements1}</View>
        <View style={[styles.flex2]}>{elements2}</View>
      </Swiper>
```

## 需要滚动

scrollview

# react-navigation

1.  npm install @react-navigation/native 

2.  npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view 

3.  npm install @react-navigation/stack

    

## 疑难排除

如果将路由容器包含在view中,请将flex:1,来填充容器

## 路由

```tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
// eslint-disable-next-line no-unused-vars
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
type ParamListBase = {
  [x: string]: object | undefined;
};
//定义泛型,同时跳转Detail
function HomeScreen({navigation}: {navigation: NavigationProp<ParamListBase>}) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate('Detail')}></Button>
    </View>
  );
}
function DetailScreen() {
  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  );
}
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}></Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

```

## goback

```tsx
 <Button title="Go back" onPress={() => navigation.goBack()} />
```

## popToTop

清除堆栈中的所有的,然后返回第一个

```tsx
 <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
```

## navigation.navigate('routename',{})

从路线中传递参数

```tsx
 {/* 传递参数 */}
      <Button
        title="Go To Details"
        onPress={() =>
          navigation.navigate('Detail', {
            itemId: 86,
            otherParam: 'hello i am home screen',
          })
        }></Button>
function DetailScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: RouteProp<ParamList, string>;
}) {
  //取出参数
  const {itemId} = route.params;
  const {otherParam} = route.params;
}

```

## 参数传递到上一个屏幕

```tsx
function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}
```

## 更新参数

*navigation.setParams* 可以更新屏幕参数

*initialParams* 可以初始化参数 

```tsx
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

## 配置标题

```tsx
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
    </Stack.Navigator>
  );
}
```

### 标题中使用参数

```tsx
 options={({ route }) => ({ title: route.params.name })}
 //options的参数是个对象有两个属性,一是navigation,而是route
```

### 更新options

```tsx
<Button
  title="Update the title"
  onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>

```

### 调整导航条样式

```tsx
 options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

```

### 跨屏幕共享定义统一风格

```tsx
  <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }}>

```

## 用自定义组件替换标题,导航条

```tsx
function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('@expo/snack-static/react-native-logo.png')}
    />
  );
}

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: props => <LogoTitle {...props} /> }}
      />
    </Stack.Navigator>
  );
}

```

### 导航栏添加按钮

一般为导航栏添加按钮是通过在屏幕组件的内部,通过navigation.setOptions来设置按钮,因为这里可以访问到这个`屏幕`的状态,上下文

```tsx
 options={{
            title: 'Home',
            // eslint-disable-next-line react/display-name
            headerRight: () => (
              <Button
                title="info"
                color="#fff"
                onPress={() => alert('this is button')}
              />
            ),
          }}

```

## 嵌套导航器

代码有误,这里的子导航器 需要重新创建导航

```tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Screen, Navigator} = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="home">
        <Screen name="Home" component={HomeScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}
function HomeScreen() {
  return (
    <Navigator initialRouteName="Messages">
      <Screen name="Feed" component={Feed}></Screen>
      <Screen name="Messages" component={Messages}></Screen>
    </Navigator>
  );
}
function Feed() {
  return <Text>i am feed</Text>;
}
function Messages({navigation}: {navigation: any}) {
  return (
    <View>
      <Text>i am Messages</Text>
      <Button
        title="button"
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}></Button>
    </View>
  );
}


```

### 深层嵌套,父传子,跳转

```tsx
navigation.navigate('Root', {
  screen: 'Settings',
  params: {
    screen: 'Sound',
    params: {
      screen: 'Media',
    },
  },
});

```

## 监听屏幕是否聚焦

1.

```tsx
  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('focus');
    });
  }, [navigation]);

```

2.使用导航钩子

```tsx
import { useFocusEffect } from '@react-navigation/native';

function Profile() {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return <ProfileContent />;
}

```

## 打开全屏模式,安卓可能无效,建议查询资料

```tsx
<Navigator initialRouteName="home" mode="modal">

```

## 应用容器

也就是NavigationContainer

```tsx
<NavigationContainer
  //状态改变
  onStateChange={state => console.log('New state is', state)}
  //初始状态
  initialState={initialState}
>
  {/* ... */}
</NavigationContainer>

```

可以用ref进行调用分配

```tsx
function App() {
  const ref = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => ref.current?.navigate('Home')}>Go home</Button>
      <NavigationContainer ref={ref}>{/* ... */}</NavigationContainer>
    </View>
  );
}

```

## <font color='red'>专业术语</font>

### 屏幕组件

也就是路由配置中使用的组件

### 导航 prop

navigation

1. dispatch讲数据发送到路由
2. navigate,goBack等api

### 路由 props

Route prop

分别有`params`,`key`,`name`

### Navigation State

导航状态,导航的路由有两条,一条是A,一条是B

```js
{
  key: 'StackRouterRoot',
  index: 1,
  routes: [
    { key: 'A', name: 'Home' },
    { key: 'B', name: 'Profile' },
  ]
}

```

### Route

每个线路都是一个导航状态

```js
{
  key: 'B',
  name: 'Profile',
  params: { id: '123' }
}

```

# Tab navigation

大部分的移动端导航都是基于Tab(标签)导航,导航可以是屏幕的底部,也可以是在屏幕的顶部,导航包括了*createBottomTabNavigator*,*createMaterialTopNavigator* ,*createMaterialBottomNavigator* 

当然在使用之前需要安装依赖

```powershell
npm i @react-navigation/bottom-tabs

```

## createBottomTabNavigator

```tsx
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>i am home</Text>
      {/*标签之中跳转*/}
       <Button
        title="go to setting"
        onPress={() => navigation.navigate('Setting')}></Button>
    </View>
  );
}

function SettingScreen() {
  return (
    <View>
      <Text>i am setting</Text>
    </View>
  );
}

const {Navigator, Screen} = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    {/*可以通过在如下标签中添加screenOption中的tabbaricon来更改图标*/}
      <Navigator>
    {/*如果想在如下某一个屏幕添加消息提示,就如同qq的底部导航栏的消息提示,请再创建*/}
        <Screen name="Home" component={HomeScreen}></Screen>
        <Screen name="Setting" component={SettingScreen}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}


```

注释:tabaricon可以获得一个jsx元素

**在有多个屏幕的需求时候,底部的导航栏可以分别渲染stack容器,stack中在分别渲染组件,达到屏幕嵌套**

```tsx
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
function HomeScreen({navigation}: any) {
  return (
    <View style={[styles.center]}>
      <Text>i am home</Text>
      <Button
        title="go to detail"
        onPress={() => navigation.navigate('Detail')}></Button>
    </View>
  );
}

function SettingScreen({navigation}: any) {
  return (
    <View style={[styles.center]}>
      <Text>i am setting</Text>
      <Button
        title="go to detail"
        onPress={() => navigation.navigate('Detail')}></Button>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={[styles.center]}>
      <Text>i am detail!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function SettingStackScreen() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
        name="Setting"
        component={SettingScreen}></SettingStack.Screen>
      <SettingStack.Screen
        name="Detail"
        component={DetailScreen}></SettingStack.Screen>
    </SettingStack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen}></Tab.Screen>
        <Tab.Screen name="Setting" component={SettingStackScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


```

**如果想要特定屏幕隐藏底部导航栏,只需要用stack为父级组件,子级组件采用tab,父级组件在切换的时候便能达到效果**

## 抽屉导航

 导航中的常见模式是从左侧（有时是右侧）使用抽屉在屏幕之间导航 

首先

```powershell
npm install @react-navigation/drawer

```

```tsx
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
function HomeScreen({navigation}: any) {
  return (
    <View style={[styles.center]}>
      <Text>home!</Text>
      <Button
        title="go to deatil"
        onPress={() => navigation.navigate('Detail')}></Button>
    </View>
  );
}

function DetailScreen({navigation}: any) {
  return (
    <View style={[styles.center]}>
      <Text>detail!</Text>
      <Button
        title="go home"
        onPress={() => navigation.navigate('Home')}></Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
        <Drawer.Screen name="Detail" component={DetailScreen}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


```

### 抽屉导航的api

```tsx
//打开抽屉
navigation.openDrawer();
//关闭抽屉
navigation.closeDrawer();
//切换抽屉,是关的就开,是开的就关
navigation.toggleDrawer();

//通过路由发送信息
navigation.dispatch(DrawerActions.openDrawer());
navigation.dispatch(DrawerActions.closeDrawer());
navigation.dispatch(DrawerActions.toggleDrawer());

//通过钩子判断抽屉是否打开
import { useIsDrawerOpen } from '@react-navigation/drawer';

const isDrawerOpen = useIsDrawerOpen();

```

## 认证流程,登录等状态验证

例如

```tsx
isSignedIn ? (
  <>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </>
) : (
  <>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </>
)

```

使用 [context](https://zh-hans.reactjs.org/docs/context.html) 来进行状态传递

## 子屏幕改变父屏幕的标题

大概意思是一个stack嵌套了另一个tab,在tab的路由改变的时候,父屏幕的名字也改变,改变为子组件的名字

```tsx
<Stack.Screen
  name="Home"
  component={HomeTabs}
  {/*通过route的name来获取子组件屏幕的名字*/}
  options={({ route }) => ({
    headerTitle: getHeaderTitle(route),
  })}
/>
//子屏幕是tab
//使用header:()=>null隐藏头部
  <MainStack.Screen
          name="Tab"
          component={TabStack}
          options={{header: () => null}}></MainStack.Screen>

```

## 自定义后退行为

react-native中的backHandler

## 从任何组件访问navigation props

useNavigation 钩子可以从不是屏幕组件的组件访问到navigation

## 在没有navigation props的时候进行导航

如redux中间件,可以使用ref

```tsx
// App.js

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>{/* ... */}</NavigationContainer>
  );
}

```

```tsx
// RootNavigation.js

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

```

```tsx
// any js module
import * as RootNavigation from './path/to/RootNavigation.js';

RootNavigation.navigate('ChatScreen', { userName: 'Lucy' });

```

## navigation导航,子改变父,子导航父

```tsx
从父亲,usenavigation 然后传递给子组件

```



# 主题

[主题](https://reactnavigation.org/docs/themes) 

# 使用TypeScript进行类型检查

```tsx
//routename:参数对象
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
//作为泛型传递给导航器
const RootStack = createStackNavigator<RootStackParamList>();

```

```tsx
import {NavigationProp} from '@react-navigation/native'
//传递泛型,paramlist是当前屏幕组件所需要导航到的目标路由的参数
type StackNavigation = NavigationProp<ParamList, 'Detail'>;
//routename:需要传递的参数
type ParamList = {
  Detail: undefined;
  Setting: undefined;
};

```

```tsx
import { RouteProp } from '@react-navigation/native';

//第一个参数为路由的类型有哪些,第二个参数为当前使用路由参数的名字
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
//routename:参数对象
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
type Props = {
  route: ProfileScreenRouteProp;
};

```

# Redux整合

使用没有不同

```tsx
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

// Render the app container component with the provider around it
export default class App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Screen configuration */}
      </NavigationContainer>
    </Provider>
  );
}

```

注意的是我们不能在Redux中存储导航数据

## 屏幕聚焦调用函数

useFocusEffect 钩子等等