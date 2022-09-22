<main>
	<div class="container w-75 mt-5 rounded shadow bg-white">
		<div class="row align-items-stretch">
			<h4 class="text-center">Weedz Collection</h4>
			<div class="col table-responsive">
				<table class="table table-sm table-striped table-bordered text-center">
					<thead class="bg-primary text-white">
						<tr>
							<th>Nombre</th>
							<th>Calificacion</th>
							<th>Tipo</th>
							<th>Efecto</th>
							<th>Aroma</th>
							<th>Sustancia</th>
						</tr>
					</thead>
					<tbody>
						{#each _Weedz as Weed}
							<tr>
								<td>{Weed.nombre}</td>
								<td>{Weed.calificacion}</td>
								<td>{Weed.tipo}</td>
								<td>{Weed.efecto}</td>
								<td>{Weed.aroma}</td>
								<td>{Weed.sustancia}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</main>
<script>
	import axios from "axios";
	import { onMount } from "svelte";

	let _Weedz = [];

	onMount(async() => {
		const { data } = await axios.get("/api/leer");
		_Weedz = data.message;
	});
</script>