<form name="my_form" action="/php_study/POST/post.php" method="post" enctype="multipart/form-data">
    <input type="text" name="my_input" value=""/>
    <br/>
    <input type="password" name="my_pass" value="1234"/>
    <br/>
    <input type="radio" name="my_radio" value="첫번째라디오">첫번째&nbsp;
    <input type="radio" name="my_radio" value="두번째라디오" checked="checked">두번째&nbsp;
    <input type="radio" name="my_radio" value="세번째라디오">세번째&nbsp;
    <br/>
    <input type="hidden" name="my_hidden" value="보이지않는값"/>
    <br/>
    <input type="checkbox" name="my_check[]" value="첫번째체크" checked="checked"/>첫번째&nbsp;
    <input type="checkbox" name="my_check[]" value="두번째체크"/>두번째&nbsp;
    <input type="checkbox" name="my_check[]" value="세번째체크"/>세번째&nbsp;
    <br/>
    <input type="button" value="버튼"/>
    <br/>
    <input type="image" src=""/>
    <br/>
    <input type="reset" value="초기화"/>
    <br/>
    <input type="file" name="my_file"/>
    <br/>
    <select name="my_select">
        <option value="select_1">첫번째선택</option>
        <option value="select_2" selected="selected">두번째선택</option>
        <option value="select_3">세번째선택</option>
    </select>
    <br/>
    <textarea name="my_textarea">긴 문자를 보냅니다.</textarea>
    <br/><br/>

    <input type='submit' value='전송'/>


</form>