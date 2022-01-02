<header>
    <div id="header_central">
    <?php
            if(isset($_SESSION['user_portal'])){
            $user = $_SESSION['user_portal'];

            $saudacao = "SELECT nomecompleto ";
            $saudacao .= "FROM clientes ";
            $saudacao .= "WHERE clienteID = $user ";

            $saudacao_login = mysqli_query($conecta,$saudacao);
            if(!$saudacao_login){
                die("falha no banco");
            } 
            $saudacao_login = mysqli_fetch_assoc($saudacao_login);
            $nome = $saudacao_login['nomecompleto'];
        ?>
            <div id='header_saudacao'><h5>Bem-vindo(a), <?php echo $nome ?> - <a href='sair.php'>Sair</a></h5> </div> 
        <?php
            }
        ?>  

        
    </div>
    <div class='headercontainer'>
        <div id='menu'>
            <a href='home.php'><img src="logo.png"></a>
            <a href="/" class="button1"><p>Produtos</p></a>
            <a href="/" class="button1"><p>Marcas</p></a>
            <a href="/" class="button1"><p>Departamentos</p></a>
            <a href="/" class="button1"><p>Promoções</p></a>
            <a href="/" class="button1"><p>Contato</p></a>
        </div>
        
        <form>
            <input id='txt' type='text' placeholder='Usuário'></input>
            <input id='txt' type='text' placeholder='Senha'></input>
            <input id='btn' type='submit' value='Login'></input>
            <input id='txt' type='text'  style='width: 70%' placeholder='Pesquisar'></input>
            <input id='btn' type='submit' value='Search'></input>

        </form>
        
    </div>
</header>