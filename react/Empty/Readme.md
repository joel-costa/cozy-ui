Empty (or error) view in a listing container

### Default

```
import Empty from 'cozy-ui/transpiled/react/Empty';
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme';


<MuiCozyTheme>
  <Empty icon="cozy" title="This list is empty" text="Try adding some content to this list"/>
</MuiCozyTheme> 
```

### With additional content

```
import Empty from 'cozy-ui/transpiled/react/Empty';
import Button from 'cozy-ui/transpiled/react/Button';
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme';

<MuiCozyTheme>
  <Empty id='empty' icon="cozy" title="An error occured" text="It's maybe nothing, just refresh to be sure">
    <Button className='u-mt-2' label="Try refreshing" />
  </Empty>
</MuiCozyTheme>
```
