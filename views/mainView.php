<?php 
	session_start();
?>
<header class="main-header">
	<img class="logo-header" src="images/logo-header.png" />
	<ul class="user-nav">
		<li>
			<span>Bienvenido</span><span class="session-name"><?php echo $_SESSION['userName']; ?></span>
		</li>
		<li class="divisor">|</li>
		<li>
			<div class="btn btn-logout">
				<span>Cerrar sesion</span>
			</div>
		</li>
	</ul>
	<!--<div class="btn btn-upload-file">
		<span>SUBIR ARCHIVO</span>
	</div>-->
</header>
<main>
	<div id="wrapper">
		<div class="wrapper-main-nav">
			<nav class="main-nav">
				<ul>
					<li class="btn btn-transactions">
						<span>TRANSACCIONES</span>
					</li>
					<li class="btn btn-upload-file">
						<span>SUBIR ARCHIVO</span>
					</li>
					<li class="btn btn-files">
						<span>ARCHIVOS</span>
					</li>
					<li class="btn btn-settings">
						<span>CONFIGURACION</span>
					</li>
				</ul>
			</nav>
		</div>
	</div>	
	<section id="main-content"></section>	
</main>


